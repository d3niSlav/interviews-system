import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { API_BASE_URL } from './api.config';
import { getJWTToken } from './web-storage';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getJWTToken();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

/**
 *
 * @template T - type.
 * @param {AxiosResponse<T>} response - axios response.
 * @returns {T} - expected object.
 */
const success = <T>(response: AxiosResponse<T>): T => {
  if (response.headers['content-type'] === 'application/octet-stream') {
    const contentDisposition = response.headers['content-disposition'];
    const originalFileName = contentDisposition.split('filename=')[1];
    const filename = originalFileName ? originalFileName.trim() : 'download';
    const url = window.URL.createObjectURL(new Blob([(response.data as unknown) as BlobPart]));
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  return response.data;
};

const error = (error: AxiosError<Error>): AxiosError<Error> => {
  throw error;
};

/**
 * HTTP GET method, used to fetch data `statusCode`: 200.
 *
 * @access public
 * @template T - `TYPE`: expected object.
 * @param {string} url - endpoint you want to reach.
 * @param {AxiosRequestConfig} [config] - axios request configuration.
 * @returns {Promise<T>} HTTP `axios` response payload.
 */
export const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return api.get(url, config).then(success).catch(error);
};

/**
 * HTTP POST method `statusCode`: 201 Created.
 *
 * @access public
 * @template T - `TYPE`: expected object.
 * @template B - `BODY`: body request object.
 * @param {string} url - endpoint you want to reach.
 * @param {B} data - payload to be send as the `request body`,
 * @param {AxiosRequestConfig} [config] - axios request configuration.
 * @returns {Promise<T>} - HTTP [axios] response payload.
 */
export const post = <T, B>(url: string, data?: B, config?: AxiosRequestConfig): Promise<T> => {
  return api.post(url, data, config).then(success).catch(error);
};

/**
 * HTTP PUT method.
 *
 * @access public
 * @template T - `TYPE`: expected object.
 * @template B - `BODY`: body request object.
 * @param {string} url - endpoint you want to reach.
 * @param {B} data - payload to be send as the `request body`,
 * @param {AxiosRequestConfig} [config] - axios request configuration.
 * @returns {Promise<T>} - HTTP [axios] response payload.
 */
export const put = <T, B>(url: string, data?: B, config?: AxiosRequestConfig): Promise<T> => {
  return api.put(url, data, config).then(success).catch(error);
};

/**
 * HTTP DELETE method, `statusCode`: 204 No Content.
 *
 * @access public
 * @template T - `TYPE`: expected object.
 * @param {string} url - endpoint you want to reach.
 * @param {AxiosRequestConfig} [config] - axios request configuration.
 * @returns {Promise<T>} - HTTP [axios] response payload.
 */
export const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return api.delete(url, config).then(success).catch(error);
};
