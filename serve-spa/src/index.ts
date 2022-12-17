import { HandleRequest, HttpRequest, HttpResponse} from "@fermyon/spin-sdk"

const encoder = new TextEncoder()

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
  let data = await fsPromises.readFile("front-end/spin-example-showcase/dist/index.html")
    return {
      status: 200,
        headers: { "foo": "bar" },
      body: data
    }
}
