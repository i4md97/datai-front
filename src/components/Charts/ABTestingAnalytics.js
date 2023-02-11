import React from 'react';
import PropTypes from 'prop-types';

// Components
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardBody, CardTitle } from 'reactstrap';

// Helpers
import getTooltipStyles from '../helpers';

// Styles
import './ABTestingAnalytics.scss';

const ABTestingAnalytics = ({ dir, themeName = 'white', data, title, subtitle1, subtitle2 }) => {

  return (
    <Card className="ab-testing-analytics">
      <CardBody className="m-0 pt-4" dir="ltr">
        <div className="text mb-3 pl-2">
          <CardTitle className="mb-1" tag="h4">
            {title}
          </CardTitle>
          <p className="mt-0">{subtitle1}</p>
          {subtitle2 &&<p className="mt-1">{subtitle2}</p>}
        </div>
        <ResponsiveContainer height={250} className="dashboard__area">
          <AreaChart data={data} margin={{ top: 20, left: -15, bottom: 20 }}>
            <XAxis dataKey="name" tickLine={false} reversed={dir === 'rtl'} />
            <YAxis tickLine={false} orientation={dir === 'rtl' ? 'right' : 'left'} />
            <Tooltip {...getTooltipStyles(themeName, 'defaultItems')} />
            <Legend 
              payload={[
                { id: 'a-label', value: 'Saldo', type: 'rect', color: '#4ce1b6'},
                { id: 'b-label', value: 'Meta', type: 'rect', color: '#70bbfd'},
              ]} 
            />
            <CartesianGrid />
            <Area name="Saldo" type="monotone" dataKey="a" fill="#4ce1b6" stroke="#4ce1b6" fillOpacity={0.2} />
            <Area name="Meta" type="monotone" dataKey="b" fill="#70bbfd" stroke="#70bbfd" fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

ABTestingAnalytics.propTypes = {
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string,
};

export default ABTestingAnalytics;
