'use client';

import { useAtomValue } from 'jotai';
import { useSetAtom } from 'jotai/index';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

import useLoading from '@/app/hooks/useLoading';
import usePhotoPopup from '@/app/hooks/usePhotoPopup';
import { isPopupOpenAtom } from '@/atom/common';
import {
  activeCategoryAtom,
  boundsAtom,
  findLocationsAtom, findReviewsAtom,
} from '@/atom/search';

import {
  createMarkers,
  createMyPosition,
} from '../_utils';

const MAP_ID = 'naver-map';

export default function Map({ loc }: { loc: Coordinates }) {
  const mapRef = useRef<NaverMap | null>();

  const { open: loadingOpen, close: loadingClose, LoadingComponent } = useLoading();
  const { open, LocationInfoComponent } = usePhotoPopup();
  const searchParams = useSearchParams();

  const [initLoading, setInitLoading] = useState(true);
  const [showInitButton, setShowInitButton] = useState(false);

  const findLocations = useSetAtom(findLocationsAtom);
  const findReviews = useSetAtom(findReviewsAtom);
  const setBounds = useSetAtom(boundsAtom);
  const setActiveCategory = useSetAtom(activeCategoryAtom);

  const isSideBarOpen = useAtomValue(isPopupOpenAtom);
  const activeCategory = useAtomValue(activeCategoryAtom);

  useEffect(() => {
    if (initLoading) return;

    const callApi = async () => {
      const offset = searchParams.get('offset') || 0;
      const limit = searchParams.get('limit') || 20;
      const category = searchParams.get('category') || '';
      const { _min, _max } = mapRef.current.getBounds();

      if (activeCategory === category) {
        await findMarkers(_min, _max, Number(offset), Number(limit), category);
      } else {
        setActiveCategory(category);
        initializeMap([mapRef.current.center.x, mapRef.current.center.y]);
      }
    };

    callApi();
  }, [searchParams.toString()]);

  const initializeMap = (pos: Coordinates | null) => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(pos || loc),
      zoom: 16,
      logoControlOptions: {
        position: window.naver.maps.Position.BOTTOM_RIGHT,
      },
    };

    mapRef.current = new window.naver.maps.Map(MAP_ID, mapOptions);
    mapRef.current.markerList = [];

    // 이벤트 등록
    window.naver.maps.Event.addListener(mapRef.current, 'zoom_changed', () => {
      setShowInitButton(true);
    });

    window.naver.maps.Event.addListener(mapRef.current, 'dragend', () => {
      setShowInitButton(true);
    });

    // 현위치 마커로 표시
    if (!pos) {
      createMyPosition(loc, mapRef.current);
    }

    // 마커 위치 불러오기
    const { _min, _max } = mapRef.current.getBounds();
    setBounds({ _min, _max });
    const category = searchParams.get('category') || '';
    findMarkers(_min, _max, 0, 20, category);

    setInitLoading(false);
  };

  useEffect(() => {
    if (!window.naver || !mapRef?.current) return;

    initializeMap(null);

  }, [loc]);

  useEffect(() => {
    return () => {
      if (!window.naver || !mapRef?.current) return;


      window.naver.maps.Event.clearListeners(mapRef.current);
    };

  }, [mapRef.current]);

  const researchLocation = () => {
    const { _min, _max } = mapRef.current.getBounds();
    setBounds({ _min, _max });
    const category = searchParams.get('category') || '';
    findMarkers(_min, _max, 0, 20, category);
  };

  const markerClickHandler = async (id: string) => {
    try {
      loadingOpen();
      const res = await findReviews({ id });

      if (res) open();
    } catch (err) {
      console.log(err);
    } finally {
      loadingClose();
    }
  };

  // maker 찍기
  const findMarkers = async (_min: Bound, _max: Bound, offset: number, limit: number, category: string) => {
    try {
      const res: LocationList = await findLocations({ _min, _max, offset, limit, category });

      createMarkers(res.items, mapRef.current, markerClickHandler);
    } catch (err) {
      console.log(err);
    } finally {
      setShowInitButton(false);
    }
  };

  return (
    <>
      <Script
        type="text/javascript"
        onReady={() => initializeMap(null)}
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      />
      <div className={'relative non-block'}>
        <div id={MAP_ID} ref={mapRef} style={{ width: '100%', height: '350px', zIndex: isSideBarOpen ? -1 : 1 }} />
        {showInitButton && (
          <div
            style={{ zIndex: isSideBarOpen ? -1 : 1, top: '2px', left: '50%', transform: 'translateX(-50%)' }}
            className={'absolute border-2 bg-[#ffffff] border-black px-4 py-1 rounded-xl cursor-pointer'}
            onClick={researchLocation}
          >
            <p className={'text-sm'}>현 위치로 재검색</p>
          </div>
        )}
      </div>
      <LocationInfoComponent />
      <LoadingComponent />
    </>
  );
};