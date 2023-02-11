// Components
import { Card, CardBody } from "reactstrap";
import { Bar } from "react-chartjs-2";
import { ResponsiveContainer } from "recharts";

// Styles
import "./BarLines.scss";

const BarLines = ({title, subtitle1, subtitle2, options, dataChart}) => {
  return(
    <Card className="bar-lines">
      <CardBody className="m-0 pt-4 pb-5">
        <div className="text-container pl-3">
          <h4 className="mb-1 card-title">{title}</h4>
          <div className="subtitles-container">
            <p>{subtitle1}</p>
            {subtitle2 && (<p className="mt-1">{subtitle2}</p>)}
          </div>
        </div>

        <ResponsiveContainer height={350}>
          <Bar options={options} data={dataChart}/>
        </ResponsiveContainer>

      </CardBody>
    </Card>
  )
}

export default BarLines;