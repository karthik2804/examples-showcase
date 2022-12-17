import { HandleRequest, HttpRequest, HttpResponse} from "@fermyon/spin-sdk"

const encoder = new TextEncoder()
const decoder = new TextDecoder()
const githubURl = "https://raw.githubusercontent.com/karthik2804/examples/add_api_generation_script"

export const handleRequest: HandleRequest = async function(request: HttpRequest): Promise<HttpResponse> {
  let path = request.headers["spin-path-info"] 

  let auth = await fsPromises.readFile("auth.json");
	const ghToken = JSON.parse(decoder.decode(new Uint8Array(auth))).token

  let gh_response = await fetch(githubURl + path, {
    headers: {
      "Authorization": "token " + ghToken
    }
  })

  // let response  = await fetch("http://localhost:5501" + path)
  return {
      status: 200,
        headers: { "Content-Type": "text/html",
        "Cache-control": "ublic, max-age=3600"},
      body: encoder.encode(await gh_response.text()).buffer
    }
}
