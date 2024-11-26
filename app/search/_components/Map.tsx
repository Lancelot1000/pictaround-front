'use client';

import { useAtomValue } from 'jotai';
import { useSetAtom } from 'jotai/index';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

import useLoading from '@/app/hooks/useLoading';
import useModal from '@/app/hooks/useModal';
import { isPopupOpenAtom } from '@/atom/common';
import {
  activeCategoryAtom,
  boundsAtom, findLocationAtom,
  findLocationsAtom, findReviewsAtom,
} from '@/atom/search';

import {
  createMarkers,
  createMyPosition,
} from '../_utils';

const MAP_ID = 'naver-map';

export default function Map({ loc, popupOpenAction }: { loc: Coordinates | null, popupOpenAction: () => void }) {
  const mapRef = useRef<NaverMap | null>();

  const { open: loadingOpen, close: loadingClose, LoadingComponent } = useLoading();
  const { open: errorModalOpen, close: errorModalClose, ModalComponent: ErrorModalComponent } = useModal();
  const searchParams = useSearchParams();

  const [initLoading, setInitLoading] = useState(true);
  const [showInitButton, setShowInitButton] = useState(false);

  const findLocations = useSetAtom(findLocationsAtom);
  const findReviews = useSetAtom(findReviewsAtom);
  const findLocation = useSetAtom(findLocationAtom);
  const setBounds = useSetAtom(boundsAtom);
  const setActiveCategory = useSetAtom(activeCategoryAtom);

  const isSideBarOpen = useAtomValue(isPopupOpenAtom);
  const activeCategory = useAtomValue(activeCategoryAtom);

  useEffect(() => {
    if (initLoading) return;

    const callApi = async () => {
      const offset = searchParams.get('offset') || 0;
      const limit = searchParams.get('limit') || 20;
      const category = searchParams.get('category') || 'all';
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
      center: new window.naver.maps.LatLng(pos || loc || [126.976882, 37.574187]),
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
    if (pos) {
      createMyPosition(pos, mapRef.current);
    }

    // 마커 위치 불러오기
    const { _min, _max } = mapRef.current.getBounds();
    setBounds({ _min, _max });
    const category = searchParams.get('category') || 'all';
    findMarkers(_min, _max, 0, 20, category);

    setInitLoading(false);
  };

  useEffect(() => {
    if (!window.naver || !mapRef?.current) return;

    // 기본설정값과 다른지 확인
    initializeMap(loc);

  }, [loc]);

  useEffect(() => {
    return () => {
      if (!window.naver || !mapRef?.current) return;


      window.naver.maps.Event.clearListeners(mapRef.current);
    };

  }, [!!mapRef?.current]);

  const researchLocation = () => {
    const { _min, _max } = mapRef.current.getBounds();
    setBounds({ _min, _max });
    const category = searchParams.get('category') || 'all';
    findMarkers(_min, _max, 0, 20, category);
  };

  const markerClickHandler = async (id: string) => {
    try {
      loadingOpen();
      const [_, res] = await Promise.all([
        findLocation({ id }),
        findReviews({ id }),
      ]);

      if (res) popupOpenAction();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      errorModalOpen();
    } finally {
      loadingClose();
    }
  };

  // maker 찍기
  const findMarkers = async (_min: Bound, _max: Bound, offset: number, limit: number, category: string) => {
    try {
      const res: LocationList = await findLocations({ _min, _max, offset, limit, category });

      createMarkers(res.items, mapRef.current, markerClickHandler);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      errorModalOpen();
    } finally {
      setShowInitButton(false);
    }
  };

  return (
    <>
      <Script
        type="text/javascript"
        onReady={() => initializeMap(null)}
        strategy="afterInteractive"
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
      <LoadingComponent />
      <ErrorModalComponent
        title={'알림'}
        content={'일시적인 오류입니다.\n다시시도해주세요.'}
        buttons={[
          {
            size: 's',
            label: '확인',
            onClick: errorModalClose,
            style: { backgroundColor: 'royalblue' },
          },
        ]}
      />
    </>
  );
};