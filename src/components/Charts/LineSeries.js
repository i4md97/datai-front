import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import {
  HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, FlexibleWidthXYPlot, YAxis,
} from 'react-vis';

const LineSeriesChart = () => {

  return (
    <div className="react-vis" dir="ltr">
      <FlexibleWidthXYPlot height={250}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
          className="react-vis__svg-line"
          curve="curveMonotoneX"
          data={[
            { x: 1, y: 3 },
            { x: 2, y: 5 },
            { x: 3, y: 15 },
            { x: 4, y: 12 },
          ]}
          color="#70bbfd"
        />
        <LineSeries
          className="react-vis__svg-line"
          curve="curveMonotoneX"
          data={[
            { x: 1, y: 10 },
            { x: 2, y: 4 },
            { x: 3, y: 2 },
            { x: 4, y: 15 },
          ]}
          color="#c88ffa"
        />
      </FlexibleWidthXYPlot>
    </div>
  );
};

export default LineSeriesChart;