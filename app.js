import express from 'express'
import { GoogleAdsApi } from 'google-ads-api'
import dotenv  from "dotenv"
import { enums } from "google-ads-api";

dotenv.config()
const app = express()
const port = 3000;

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const developer_token = process.env.developer_token;

const customer_id = process.env.customer_id;
const refresh_token = process.env.refresh_token;

const client = new GoogleAdsApi({
  client_id,
  client_secret,
  developer_token,
});

const customer = client.Customer({
  customer_id,
  refresh_token
});
 
app.get('/customers', async (req, res) => {
  try {
    const customers = await client.listAccessibleCustomers(refresh_token);
    res.send(customers);
  }
  catch (e) {
    res.send("customers could not be fetched");
  }
})

app.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await customer.report({
      entity: "ad_group",
      metrics: [
        "metrics.cost_micros",
        "metrics.clicks",
        "metric.impressions",
        "metrics.all_conversions",
      ],
      segments: ["segments.date"],
      from_date: "2021-01-01",
      to_date: "2021-02-01",
    });
    res.send(campaigns)    
  }
  catch (e) {
    res.send(e);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})