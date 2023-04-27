import axios from "axios";
import { DataBase } from "@/types";

export const getDatabase = async (dbId: string, secret: string): Promise<DataBase> => {
  const data = {
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
  }

  const config = {
    headers: {
      'Notion-Version': '2021-05-13',
      'Authorization': `Bearer ${secret}`,
      'Content-Type': 'text/plain',
    },
  }

  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      data,
      config,
    ) || {}
    const { data: { results = [] } } = response

    return results
  } catch (e) {
    return []
  }
}
