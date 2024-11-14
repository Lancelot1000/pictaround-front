'use client';

import { useAtomValue } from 'jotai';
import { useSetAtom } from 'jotai/index';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

import { isSideBarOpenAtom } from '@/atom/common';
import { findLocationsAtom } from '@/atom/search';

import {
  createMyPosition,
  createMarkers,
} from '../_utils';

const MAP_ID = 'naver-map';

export default function Map({ loc }: { loc: Coordinates }) {
  const mapRef = useRef<NaverMap | null>();

  const [showInitButton, setShowInitButton] = useState(false);

  const findLocations = useSetAtom(findLocationsAtom);

  const isSideBarOpen = useAtomValue(isSideBarOpenAtom);

  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(loc),
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

    // 현재 위치 마커로 표시
    createMyPosition(loc, mapRef.current);

    // 마커 위치 불러오기
    const { _min, _max } = mapRef.current.getBounds();
    findMakers(_min, _max, 0, 20);
  };

  useEffect(() => {
    if (!window.naver || !mapRef?.current) return;

    initializeMap();

  }, [loc]);

  useEffect(() => {
    return () => {
      if (!window.naver || !mapRef?.current) return;


      window.naver.maps.Event.clearListeners(mapRef.current);
    };

  }, [mapRef.current]);

  const researchLocation = () => {
    const { _min, _max } = mapRef.current.getBounds();
    findMakers(_min, _max, 0, 20);
  };

  // maker 찍기
  const findMakers = async (_min: Bound, _max: Bound, offset: number, limit: number) => {
    try {
      const res: LocationList = await findLocations({ _min, _max, offset, limit });

      createMarkers(res.items, mapRef.current);
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
        onReady={initializeMap}
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      />
      <div className={'relative'}>
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
    </>
  );
};