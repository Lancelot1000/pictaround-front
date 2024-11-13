'use client';

import { useAtomValue } from 'jotai';
import Script from 'next/script';
import { useCallback, useEffect, useRef } from 'react';

import { isSideBarOpenAtom } from '@/atom/common';

const MAP_ID = 'naver-map';

export default function Map({ loc }: { loc: Coordinates }) {
  const isSideBarOpen = useAtomValue(isSideBarOpenAtom);
  const mapRef = useRef<NaverMap>();

  const initializeMap = useCallback(() => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(loc),
      zoom: 16,
      logoControlOptions: {
        position: window.naver.maps.Position.BOTTOM_RIGHT,
      },
    };

    const map = new window.naver.maps.Map(MAP_ID, mapOptions);

    mapRef.current = map;

    // 현재 위치 마커로 표시
    createMakers([loc], {
      content: `<div class="currentPosition_outer"><div class="currentPosition_inner"></div></div>`,
    });
  }, [loc]);

  useEffect(() => {
    if (!window.naver || !mapRef?.current) return;

    initializeMap();

  }, [loc]);

  const createMakers = (markers: Coordinates[], markerContent: MarkIcon) => {
    if (typeof markers !== 'object') return;

    markers.map(marker => {
      mapRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(marker[1], marker[0]),
        map: mapRef.current,
        icon: markerContent,
      });
    });
  };

  return (
    <>
      <Script
        type="text/javascript"
        onReady={initializeMap}
        strategy="beforeInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
      />
      <div id={MAP_ID} ref={mapRef} style={{ width: '100%', height: '300px', zIndex: isSideBarOpen ? -1 : 1 }} />
    </>
  );
}