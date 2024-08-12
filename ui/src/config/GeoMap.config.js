const mapPinSymbol = {
  type: "text",
  color: "SlateBlue",
  text: "\ue61d", // esri-icon-map-pin
  font: {
    size: 28,
    family: "CalciteWebCoreIcons"
  }
};

const homeSymbol = {
  type: "text",
  color: "SaddleBrown",
  text: "\ue62f", // esri-icon-home
  font: {
    size: 32,
    family: "CalciteWebCoreIcons"
  }
};

let starImage = {
  type: "picture-marker",
  url: "images/BlackStarLargeB.png",
  width: "64px",
  height: "64px"
};

const popupTemplate = {
  title: "<div style='color: white'>New Title</div>",
  content: "You can define any object here...",
}

export const markers = [
  {
    point: {
      latitude: 52.75668822944462,
      longitude: 24.989266406250973,
    },
    symbol: mapPinSymbol,
    popupTemplate: popupTemplate
  },
  {
    point: {
      latitude: 53,
      longitude: 27,
    },
    symbol: homeSymbol,
    popupTemplate: {
      ...popupTemplate,
      title: "<div style='color:white'>Job occupation</div>",
      content: "<p></p><p>2023 figures related to <b>job occupation</b> on this city.</p>" +
        "<ul><li>70% people is working full time</li>" +
        "<li>25% have a part time job</li>" +
        "<li>5% is not working</li><ul>"
    }
  },
  {
    point: {
      latitude: 51,
      longitude: 23,
    },
    symbol: starImage,
    popupTemplate: popupTemplate
  },
  {
    point: {
      latitude: 52.66,
      longitude: 23.893,
    },
    symbol: {
      type: "simple-marker",
      color: [226, 119, 40],
    },
    popupTemplate: {
      ...popupTemplate,
      title: "New Title",
      content: "New content to add here..."
    }
  },
  {
    point: {
      latitude: 51.3,
      longitude: 25.6,
    },
    symbol: {
      type: "simple-marker",
      color: [226, 119, 40],
    }
  },
  {
    point: {
      latitude: 51.9,
      longitude: 25.1,
    },
    symbol: {
      type: "simple-marker",
      outline: {
        color: "rgba(0, 139, 174, 0.5)",
        width: 5
      },
      size: 13,
      color: "#69dcff",
    }
  },
  {
    point: {
      latitude: 55.1,
      longitude: 25.0,
    },
    symbol: {
      type: "simple-marker",
      outline: {
        color: "rgba(0, 139, 174, 0.5)",
        width: 5
      },
      size: 13,
      color: "#69dcff",
    }
  },
  {
    point: {
      latitude: 53,
      longitude: 21,
    },
    symbol: mapPinSymbol
  },
  {
    point: {
      latitude: 55.2603,
      longitude: 27.4,
    },
    symbol: {
      type: "text",
      color: "red",
      text: "\ue613",
      font: {
        size: 22,
        family: "CalciteWebCoreIcons"
      }
    }
  },
  {
    mgrs: '35UNA 64760 39614',
    symbol: {
      type: "text",
      color: "navy",
      text: "MGRS",
      font: {
        size: 14
      }
    }
  },
  {
    utm: '34U 640836 5887000',
    symbol: {
      type: "text",
      color: "black",
      text: "UTM",
      font: {
        size: 14
      }
    }
  }
]

export const shapes = [
  {
    geometry: {
      type: "polygon",
      // Wyoming
      rings: [
        [
          [-109.080842, 45.002073],
          [-105.91517, 45.002073],
          [-104.058488, 44.996596],
          [-104.053011, 43.002989],
          [-104.053011, 41.003906],
          [-105.728954, 40.998429],
          [-107.919731, 41.003906],
          [-109.04798, 40.998429],
          [-111.047063, 40.998429],
          [-111.047063, 42.000709],
          [-111.047063, 44.476286],
          [-111.05254, 45.002073],
          [-109.080842, 45.002073]
        ]
      ]
    },
    symbol: {
      type: "simple-line",
      color: "red",
      width: 2
    }
  },
  {
    geometry: {
      type: "polygon",
      // Bermuda Triangle
      rings: [
        [
          [-64.78, 32.3],
          [-66.07, 18.45],
          [-80.21, 25.78],
          [-64.78, 32.3]
        ]
      ]
    },
    symbol: {
      type: "simple-fill",
      color: [227, 139, 79, 0.4],
      outline: {
        type: "simple-line",
        color: [0, 128, 0],
        width: 1
      }
    }
  },
  {
    geometry: {
      type: "polyline",
      paths: [
        [
          [-123.1207, 49.2827], // Vancouver
          [-114.0719, 51.0447], // Calgary
          [-113.4937, 53.5461]  // Edmonton
        ]
      ]
    },
    symbol: {
      type: 'simple-line',
      color: "blue",
      width: 3
    }
  }
]

export const transformMarkers = (data) => {
  if (!data) return;
  let transformed = [];
  data.forEach(r => {
    // Get address(es) from payload and build location points
    const entityType = r?.extracted?.person ? 'person' : 'organization';
    if (r?.extracted && r?.extracted[entityType] && r?.extracted[entityType]?.addresses) {
      let addressesVar = r.extracted[entityType].addresses
      let addressesArr = Array.isArray(addressesVar?.address) ?
      addressesVar?.address :
      [addressesVar?.address];
      let uri = r?.uri;
      let addresses = addressesArr.map(a => {
        const entityName = entityType === 'person' ?
          r?.extracted[entityType]?.nameGroup?.givenname?.value + " " + r?.extracted?.person?.nameGroup?.surname?.value :
          r?.extracted[entityType]?.names?.name?.value;
        return {
          point: {
            latitude: a.latitude,
            longitude: a.longitude,
            uri: uri
          },
          // popupTemplate: {
          //   title: `<div style='color:white'>${entityName}</div>`,
          //   content: `<p style='margin:18px'><span>Entity Type: ${entityType}</span><br/><br/>`
          //   +`<span>Street: ${a?.street || ""}</span><br/>`
          //   +`<span>City: ${a?.city || ""}</span><br/>`
          //   +`<span>State: ${a?.state || ""}</span></p>`,
          //    actions: [{
          //     title: "More details",
          //     id: "more-details",
          //     image: "https://developers.arcgis.com/javascript/latest//sample-code/popup-actions/live/Measure_Distance16.png",
          //     uri: uri
          //     }]
          // },
          symbol: {
            type: "text",
            color: entityType === 'person' ? "Tomato" : 'SlateBlue',
            // text: "\ue61d", // esri-icon-map-pin
            text: entityType === 'person' ? "\ue675" : '\ue687',
            font: {
              size: 24,
              family: "CalciteWebCoreIcons"
            }
          }
        }
      })
      transformed = [...transformed, ...addresses]
    }
  });

  console.log("TRANSFORMED", transformed)
  return transformed;
}


export const transformGeoMarkers = (data) => {
  if (!data) return;
  let transformed = [];
  data.forEach(r => {
    // Get address(es) from payload and build location points
    if (r?.properties && r?.properties.OBJECTID && r?.properties.latitude && r?.properties.longitude) {
      const marker = {
          point: {
            latitude: r.properties.latitude,
            longitude: r.properties.longitude,
            uri: r.properties.uri
          },
          symbol: {
            type: "text",
            color: "Tomato",
            text: "\ue61d",
            font: {
              size: 24,
              family: "CalciteWebCoreIcons"
            }
          }
        }
      transformed.push(marker);
    }
  });

  console.log("TRANSFORMED GEO DATA", transformed)
  return transformed;
}

export const transformShapes = (data) => {
  if (!data) return;
  console.log('transform', data);
  let transformed = [];
  transformed = data.map(r => {
    // Give all polyline shapes a dash style
    if (r.geometry?.type === 'polyline' && r.symbol.type === 'simple-line') {
      r.symbol.style = 'dash';
    }
    return r;
  });
  return transformed;
}
