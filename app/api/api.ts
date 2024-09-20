'use client';
import axios, { AxiosInstance } from 'axios';
import { getCookie } from './helpers/cookies';

export const ApiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROOT,
});

ApiClient.interceptors.request.use((config) => {
  const accessToken: string | null = getCookie('accessToken');
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
