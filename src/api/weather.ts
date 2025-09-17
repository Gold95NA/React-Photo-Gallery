import axios, { AxiosResponse } from 'axios';
import { WEATHER_API_BASE, WEATHER_API_KEY } from '../config/weather';
import { getDayOfWeek } from '../utils/dates';
import type { CurrentWeatherData, ForecastWeatherData } from '../navigation/types';

export const currentUrl = (q: string) =>
  `${WEATHER_API_BASE}/current.json?q=${encodeURIComponent(q)}&key=${WEATHER_API_KEY}`;

export const forecastUrl = (q: string, days: number) =>
  `${WEATHER_API_BASE}/forecast.json?q=${encodeURIComponent(q)}&days=${days}&key=${WEATHER_API_KEY}`;

export const fetchCurrent = (q: string) => axios.get(currentUrl(q));
export const fetchForecast = (q: string, days: number) => axios.get(forecastUrl(q, days));

export const mapCurrent = (response: AxiosResponse<any>): CurrentWeatherData => {
  const { location, current } = response.data;
  return {
    location: { name: location.name, region: location.region },
    current: {
      condition: {
        text: current.condition.text,
        icon: normalizeIcon(current.condition.icon),
      },
      tempF: Math.round(current.temp_f),
    },
  };
};

export const mapForecast = (response: AxiosResponse<any>): ForecastWeatherData => {
  const { forecast, location } = response.data;
  return {
    forecast: {
      forecastDay: forecast.forecastday.map((fd: any) => ({
        date: getDayOfWeek(fd.date),
        day: {
          condition: {
            text: fd.day.condition.text,
            icon: normalizeIcon(fd.day.condition.icon),
          },
          maxTempF: Math.round(fd.day.maxtemp_f),
          minTempF: Math.round(fd.day.mintemp_f),
        },
      })),
    },
    location: { name: location.name, region: location.region },
  };
};

const normalizeIcon = (icon: string) => (icon.startsWith('//') ? `https:${icon}` : icon);