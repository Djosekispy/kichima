import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import Imagem from './atom/image'
import { imageArray } from '@/utils/publicityImages'
import { ipaddress } from '@/utils/api';

interface dataDTO{
  data?: string[];
  height: number;
  width:number
}

export default function Publicity({data,height,width}:dataDTO) {

  return (
    <View
    >
  <FlatList
      data={data ? data : imageArray}
      renderItem={({ item }) => (
        <Imagem src={data ?`${ipaddress}/${item}` : item} height={height} width={width} margin={4} />
      )}
      horizontal
      keyExtractor={(item, index) => index.toString()}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    />
    </View>
  )
}
