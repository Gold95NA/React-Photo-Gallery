export type DrawerParamList = {
  HW_PhotoGallery: undefined;
  HW_Weather: undefined;
};

export type PhotoStackParamList = {
  Gallery: undefined;
  PhotoDetail: { id: number; url: string };
  PhotoModal: { id: number; url: string };
};

export type WeatherDrawerParamList = {
  Current: { q?: string } | undefined;
  ForecastTabs: { q?: string } | undefined; 
};

export type ForecastTabsParamList = {
  Forecast3: { q?: string; days: number };
  Forecast7: { q?: string; days: number };
};

export type CurrentWeatherData = {
  location: { name: string; region: string };
  current: { condition: { text: string; icon: string }; tempF: number };
};

export type ForecastWeatherData = {
  location: { name: string; region: string };
  forecast: {
    forecastDay: Array<{
      date: string;
      day: {
        condition: { text: string; icon: string };
        maxTempF: number;
        minTempF: number;
      };
    }>;
  };
};