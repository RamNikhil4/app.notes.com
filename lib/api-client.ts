interface IAPIResponse {
  success: boolean;
  status: number;
  data: any;
  message?: any;
}

const prepareURLEncodedParams = (
  url: string,
  params: Record<string, string | number | boolean | undefined>,
): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });
  const queryString = searchParams.toString();
  return queryString
    ? `${url}${url.includes("?") ? "&" : "?"}${queryString}`
    : url;
};

class FetchService {
  private authStatusCodes: number[] = [401, 403, 404];
  private authErrorURLs: string[] = [
    "/auth/signin-with-phone",
    "/auth/signin-with-email",
  ];

  private _fetchType: string;

  constructor(fetchTypeValue = "json") {
    this._fetchType = fetchTypeValue;
  }

  private getBaseUrl(): string {
    return process.env.NEXT_PUBLIC_API_URL || "";
  }

  private setDefaultHeaders(config: any) {
    config.headers = config.headers || {};
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
  }

  private checkToLogOutOrNot(path: string) {
    return this.authErrorURLs.some((url: string) => path.includes(url));
  }

  private isAuthRequest(path: string) {
    return this.authErrorURLs.some((url) => path.includes(url));
  }

  private getCredentialsMode(): RequestCredentials {
    return "include";
  }

  private async refreshAccessToken(): Promise<boolean> {
    if (typeof window === "undefined") return false;

    try {
      const response = await fetch(`${this.getBaseUrl()}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important: send cookies with refresh request
      });

      if (!response.ok) {
        window.location.href = "/login";
        return false;
      }

      return true;
    } catch {
      window.location.href = "/login";
      return false;
    }
  }

  async hit(
    ...args: [string, RequestInit & { headers?: any }]
  ): Promise<IAPIResponse> {
    const [path, config] = args;
    config.headers = config.headers || {};

    // Ensure credentials are sent with every request
    config.credentials = this.getCredentialsMode();

    // Only set default content type if not purely FormData (which handles its own boundary)
    if (!(config.body instanceof FormData) && !config.headers["Content-Type"]) {
      this.setDefaultHeaders(config);
    }

    const url = `${this.getBaseUrl()}${path.startsWith("/") ? "" : "/"}${path}`;
    let response: Response;

    try {
      response = await fetch(url, config);
    } catch (error: any) {
      return {
        success: false,
        status: 500,
        data: null,
        message: error.message || "Network Error",
      };
    }

    if (!response.ok) {
      if (response.status === 401 && !this.checkToLogOutOrNot(path)) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          // Retry the original request (cookies will be sent automatically)
          return this.hit(path, config);
        }
      }

      if (
        this.authStatusCodes.includes(response.status) &&
        !this.checkToLogOutOrNot(path)
      ) {
        const contentType = response.headers.get("Content-Type") || "";
        let errorData;
        try {
          errorData = contentType.includes("application/json")
            ? await response.json()
            : await response.text();
        } catch {
          errorData = { message: response.statusText };
        }

        const error: any = new Error(errorData.message || response.statusText);
        error.data = errorData;
        error.status = response.status;
        throw error;
      }

      const contentType = response.headers.get("Content-Type") || "";
      let errorData;
      try {
        errorData = contentType.includes("application/json")
          ? await response.json()
          : await response.text();
      } catch {
        errorData = { message: response.statusText };
      }
      const err: any = new Error(errorData.message || response.statusText);
      err.data = errorData;
      err.status = response.status;
      throw err;
    }

    if (response.status === 204) {
      return {
        success: true,
        status: 204,
        data: null,
      };
    }

    if (this._fetchType === "response") {
      return {
        success: true,
        status: response.status,
        data: response,
      };
    } else {
      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        return {
          success: true,
          status: response.status,
          data: await response.json(),
        };
      }
      return {
        success: true,
        status: response.status,
        data: await response.text(),
      };
    }
  }

  async post(url: string, payload?: any) {
    return await this.hit(url, {
      method: "POST",
      body: payload ? JSON.stringify(payload) : undefined,
    });
  }

  async postFormData(url: string, file?: File | FormData) {
    return await this.hit(url, {
      method: "POST",
      body: file,
    });
  }

  async get(
    url: string,
    queryParams: Record<string, any> = {},
    contentType?: string,
  ) {
    let finalUrl = url;
    if (Object.keys(queryParams).length) {
      finalUrl = prepareURLEncodedParams(url, queryParams);
    }
    const config: any = {
      method: "GET",
      headers: {},
    };

    if (contentType) {
      config.headers["Content-Type"] = contentType;
      config.headers["Accept"] = contentType;
    } else {
      this.setDefaultHeaders(config);
    }

    return this.hit(finalUrl, config);
  }

  async delete(url: string, payload = {}) {
    return this.hit(url, {
      method: "DELETE",
      body: JSON.stringify(payload),
    });
  }

  async deleteWithOutPayload(url: string) {
    return this.hit(url, {
      method: "DELETE",
    });
  }

  async put(url: string, payload = {}) {
    return this.hit(url, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  async patch(url: string, payload = {}) {
    return this.hit(url, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }
}

export const $fetch = new FetchService();
export const $fetchResponse = new FetchService("response");
export default FetchService;
