/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */
import request from '@/router/axios'
import store from '@/store'
import qs from 'qs'
import { getStore, setStore } from "@/util/store.js";
import website from "@/const/website.js";


const scope = 'server'

export const getUserarea = () => {
  return request({
    url: '/shop/shopscope/list',
    method: 'get'
  })
}

export const getShoparea = () => {
  return request({
    url: '/shop/shoptype/list',
    method: 'get'
  })
}
export const postShopapply = (data) => {
  return request({
    url: '/shop/shop/apply',
    method: 'post',
    data:data
  })
}

export const getinvoicetypeList = () => {
  return request({
    url: '/shop/shop/invoicetype/list',
    method: 'get'
  })
}

export const postshopSubmit = (data) => {
  return request({
    url: '/shop/shop/submit',
    method: 'post',
    data
  })
}
export const shopcertifyUpload = (data) => {
  return request({
    url: '/shop/shopcertify/upload',
    method: 'post',
    contentType: 'blob',
    data
  })
}
export const shopFinish = (data) => {
  return request({
    url: '/shop/shop/finish',
    method: 'post',
    data:data
  })
}


export const logout = () => {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}
export const getStatus = () => {
  return request({
    url: '/shop/shop/status',
    method: 'get'
  })
}

