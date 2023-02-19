import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Components
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardBody, CardTitle } from 'reactstrap';

// Helpers
import getTooltipStyles from '../helpers';

// Styles
import './ABTestingAnalytics.scss';

export const MultipleTestingAnalytics = ({ dir, themeName = 'white', data, title, subtitle1, subtitle2 }) => {
  const palette = [
    "#00f5d4",
    "#9b5de5",
    "#06d6a0",
    "#118ab2",
    "#f15bb5",
    "#ef476f",
    "#073b4c",
    "#ff85f1",
    "#ffd166",
    "#ff4861"
  ];

  const [formattedData, setFormattedData] = useState({
    areas: [],
    legends: [],
    colors: [],
  });

  const getRandomColor = () => {
    return palette[Math.floor(Math.random()*palette.length)];
  }

  useEffect(()=>{
    let areas = [];
    let legends = [];
    let colors = [];
    if (data) {
      // areas
      data.chartData && Object.entries(data.chartData[0]).map(([key, value]) => {
        if (key !== "name" && key !== "color") {
          areas.push(key);
        }
      })
      // legends
      areas.map((area, i) => {
        // colors
        const colorExists = palette[i];
        const color = colorExists ? colorExists : getRandomColor();
        colors.push(color);
        legends.push({
          id: `${data.legends[i].toLowerCase().trim()}`, 
          value: data.legends[i], 
          type: 'rect',
          color: color
        });
      });
    }
    setFormattedData({
      areas: areas,
      colors: colors,
      legends: legends
    })

  },[]);

  const renderAreas = () => {
    return formattedData?.areas.map((area, i) => {
      return <Area 
        key={`chart-area-${i}`} 
        name="efectivo"
        type="monotone" 
        dataKey={`${area}`} 
        fill={formattedData.colors[i]} 
        stroke={formattedData.colors[i]} 
        fillOpacity={0.2} 
      />
    })
  }

  return (
    <Card className="ab-testing-analytics">
      {renderAreas()}
      <CardBody className="m-0 pt-4" dir="ltr">
        <div className="text mb-3 pl-2">
          <CardTitle className="mb-1" tag="h4">
            {title}
          </CardTitle>
          <p className="mt-0">{subtitle1}</p>
          {subtitle2 &&<p className="mt-1">{subtitle2}</p>}
        </div>
        <ResponsiveContainer height={250} className="dashboard__area">
          <AreaChart data={data.chartData} margin={{ top: 20, left: -15, bottom: 20 }}>
            <XAxis dataKey="name" tickLine={false} reversed={dir === 'rtl'} />
            <YAxis tickLine={false} orientation={dir === 'rtl' ? 'right' : 'left'} />
            <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
            <Legend 
              payload={formattedData?.legends}
            />
            <CartesianGrid />
            {renderAreas()}
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

MultipleTestingAnalytics.propTypes = {
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string,
};
