export async function pizzaApi<T>(url: string): Promise<T> {
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error("Упсс что-то идет не так");
  }
  return (await response.json()) as Promise<T>;
}
