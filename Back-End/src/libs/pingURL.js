import axios from "axios";

export default async function pingURL(url) {
  const response = await axios.head(url);
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}
