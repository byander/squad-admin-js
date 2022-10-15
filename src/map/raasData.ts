export type LayerData = {
  background: {
    corners: [{ x: number; y: number }, { x: number; y: number }];
    minimap_filename: string;
  };

  clusters: {
    [clusterName: string]: {
      display_name: string;
      sdk_name: string;
      x: number;
      y: number;
    }[];
  };

  lanes: {
    [laneName: string]: { a: string; b: string }[];
  };

  mains: [string, string];
};

export type RaasData = {
  [mapName: string]: {
    [layerName: string]: LayerData;
  };
};

// export const raasData: RaasData = require('../assets/raas-data.yaml');
export const raasData: RaasData = import('../assets/raas-data.yaml');
