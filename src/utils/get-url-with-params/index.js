export function getURLWithParams(params) {
  const urlSearchParams = new URLSearchParams(window.location.search);

  for (const key in params) {
    urlSearchParams.set(key, params[key]);
    params[key] === '' && urlSearchParams.delete(key);
  }

  return `${window.location.pathname}?${urlSearchParams}`;
}