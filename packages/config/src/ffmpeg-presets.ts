export interface Preset {
  name: string;
  width: number;
  height: number;
  filters: string[]; // ffmpeg filter arguments
}

export const FFMPEG_PRESETS: Record<string, Preset> = {
  '9:16': {
    name: 'Vertical 9:16',
    width: 1080,
    height: 1920,
    filters: [
      // scale & pad to vertical
      "scale='iw*min(1080/iw,1920/ih)':ih*min(1080/iw,1920/ih)',pad=1080:1920:(1080-iw*min(1080/iw,1920/ih))/2:(1920-ih*min(1080/iw,1920/ih))/2"
    ],
  },
  '1:1': {
    name: 'Square 1:1',
    width: 1080,
    height: 1080,
    filters: ["scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2"],
  },
  '16:9': {
    name: 'Landscape 16:9',
    width: 1920,
    height: 1080,
    filters: [],
  },
}; 