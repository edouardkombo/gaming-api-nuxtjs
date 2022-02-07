import get from "lodash/get";
import has from "lodash/has";
import mapValues from "lodash/mapValues";
import isomorphicFetch from "isomorphic-unfetch";
import { ENTRYPOINT } from "../config/entrypoint";

const MIME_TYPE = "application/ld+json";

interface Violation {
  message: string;
  propertyPath: string;
}

export const fetch = async (id: string, init: RequestInit = {}) => {
  if (typeof init.headers === "undefined") init.headers = {};
  if (!init.headers.hasOwnProperty("Accept"))
    init.headers = { ...init.headers, Accept: MIME_TYPE };
  if (
    init.body !== undefined &&
    !(init.body instanceof FormData) &&
    !init.headers.hasOwnProperty("Content-Type")
  )
    init.headers = { ...init.headers, "Content-Type": MIME_TYPE };
  
  init.headers = { ...init.headers};  
  const resp = await isomorphicFetch(ENTRYPOINT + id, init);
  if (resp.status === 204) return;

  const json = await resp.json();
  if (resp.ok) return normalize(json);

  const defaultErrorMsg = json["hydra:title"];
  const status = json["hydra:description"] || resp.statusText;
  if (!json.violations) throw Error(defaultErrorMsg);
  const fields = {};
  json.violations.map(
    (violation: Violation) =>
      (fields[violation.propertyPath] = violation.message)
  );

  throw { defaultErrorMsg, status, fields };
};

export const filterGamesByCountry = (data: any, restricted: any)  => {
   if (has(data, "hydra:member") && has(restricted, "hydra:member")) {
     data["hydra:member"] = data["hydra:member"].filter((value, key) => {
       for (let gameKey in restricted['hydra:member']) {
           return (restricted['hydra:member'][gameKey]['launchcode']!=value['launchcode']);
       }       
     });
     return data;
   }

   return data;
} 

export const normalize = (data: any) => {
  if (has(data, "hydra:member")) {
    return data;
  }
};
