import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./title";
import { Invest } from "../../interface/invest.interface";
import Utils from "../../helper/utils";

interface Props {
  utils: Utils;
}

export default function Chart(props: Props) {
  const theme = useTheme();
  let amount = 0;
  const data = props.utils?.user?.invests?.map((invest: Invest) => {
    amount += invest.value;
    return {
      time: new Date(invest.created_at).toLocaleDateString("en"),
      amount,
    };
  });

  return (
    <React.Fragment>
      <Title>Investment monitoring chart</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Wei (Ξ)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
