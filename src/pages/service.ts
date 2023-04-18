import axios from "axios";
import { DataBase } from "./types";

export const getDatabase = async (dbId: string, secret: string): Promise<DataBase> => {
  var config = {
    method: 'post',
    url: `https://api.notion.com/v1/databases/${dbId}/query`,
    headers: {
      'Notion-Version': '2021-05-13',
      'Authorization': `Bearer ${secret}`,
      'Content-Type': 'text/plain',
    },
    data: {
      sorts: [
        {
          property: "type",
          direction: "ascending"
        },
        {
          property: "priority",
          direction: "descending"
        },
      ],
    },
  };

  const response = await axios(config) || {}
  const { data: { results = [] } } = response

  return results
}
