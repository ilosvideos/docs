# Video API

The Video API allows you to interact with videos on your VidGrid account.

## Video Resource

The Video Resource(s) returned in a successful response.

*Property types with a <strong>?</strong> are only returned if they are requested with a [Retrieve Video Params Array](#retrieve-video-params-array).*

> Example Video Resource Object.

```json
{
  "identifier": "...",
  "title": "Video Title",
  "view_url": "https://app.vidgrid.com/view/identifier",
  "embed_url": "https://app.vidgrid.com/embed/identifier",
  "signed_url": "...",
  "metadata": {
    "width": 1280,
    "height": 720,
    "duration": 445.03,
    "filesize": 25109038
  },
  "thumbnail": {
    "signed_url": "...",
    "signed_url_small": "..."
  },
  "jwts": {
    "view": "...",
    "edit": "..."
  },
  "captions": [
    Caption Resource Object,
    Caption Resource Object
  ]
}

```

| Prop | Type | Value |
| ---- | ---- | ----- |
| **identifier** | string | The unique identifier for the video. |
| **title** | string | Title of the video. |
| **view_url** | string | URL to view the video. |
| **embed_url** | string | URL to embed the video. |
| **signed_url** | **?**string | Signed URL that can be used to view the video file directly.<br>*Expires after 6 hours.* |
| **metadata.duration** | **?**number | Duration of the video in seconds. |
| **metadata.width** | **?**number | Width of the video.<br>*Width may differ between videos uploaded and videos done processing.* |
| **metadata.height** | **?**number | Height of the video.<br>*Height may differ between videos uploaded and videos done processing.* |
| **metadata.filesize** | **?**number | Size of the video in bytes.<br>*Filesize may differ between videos uploaded and videos done processing.* |
| **thumbnail.signed_url** | **?**string | Signed URL for the video thumbnail. |
| **thumbnail.signed_url_small** | **?**string | Signed URL for a smaller version of the video thumbnail. |
| **jwt.view** | **?**string | A single-use access token that can be used to grant view permissions for a video on VidGrid. On page load a new access token will be generated that allows the user to view the video for 6 hours, but the token in the URL will have expired.<br>*You can use the token with view or embed URLs as follows: `{embed_url}?auth={jwts.view}`* |
| **jwt.edit** | **?**string | A single-use access token that can be used to grant edit permissions for a video on VidGrid. On page load a new access token will be generated that allows the user to edit the video for 6 hours, but the token in the URL will have expired.<br>*You can use the token with view or embed URLs as follows: `{embed_url}?auth={jwts.edit}`* |
| **captions** | **?**array | An array of [Caption Resources](#caption-resource) attached to this video. |
| **token_key** | **?**string | The public identifier corresponding to the [Token Resource](#token-resources) used when creating this video through the API. |

## Create Video

To create videos you will need to make use of the [Video Creation Token Api](#video-creation-token-api).

## Retrieve Video

This endpoint returns an array of [Video Resources](#video-resource).

### HTTP Request

> Example retrieve video request.

```shell
curl -X GET \
  'https://api.vidgrid.com/v2/videos' \
  -H 'Authorization: Basic {token}' \
  -H 'Content-Type: application/json' \
  -d '{
    "identifiers": [
      "...",
      "..."
    ],
    "include": [
      "signed_url",
      "metadata",
      "thumbnail",
      "jwts",
      "captions"
    ]
  }'
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.vidgrid.com/v2/videos")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)
request["Content-Type"] = 'application/json'
request["Authorization"] = 'Basic {token}'
request.body = '{
  "identifiers": [
    "...",
    "..."
  ],
  "include": [
    "signed_url",
    "metadata",
    "thumbnail",
    "jwts"
  ]
}'

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "https://api.vidgrid.com/v2/videos"

payload = '{
  "identifiers": [
    "...",
    "..."
  ],
  "include": [
    "signed_url",
    "metadata",
    "thumbnail",
    "jwts"
  ]
}'
headers = {
  'Content-Type': "application/json",
  'Authorization': "Basic {token}",
}

response = requests.request("GET", url, data=payload, headers=headers)

print(response.text)
```

```javascript
// NodeJS

var request = require("request");

var options = {
  method: 'GET',
  url: 'https://api.vidgrid.com/v2/videos',
  headers: { 
    Authorization: 'Basic {token}',
    'Content-Type': 'application/json' 
  },
  body: { 
    identifiers: [
      '...',
      '...'
    ],
    include: [ 
      'signed_url', 
      'metadata', 
      'thumbnail',
      'jwts'
    ] 
  },
  json: true 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> Example retrieve video response. See [Video Resource](#video-resource) for more details.

```json
{
  "data": [
    Video Resource Object,
    Video Resource Object
  ]
}
```

`GET https://api.vidgrid.com/v2/videos`

### HTTP Parameters

| Param | Type | Description | Default |
| ----- | ---- | ----------- | ------- |
| **identifier** | string | The unique identifier of a video.<br>*You may pass this in the body or on the URL: `/v2/videos/identifier`* | *Required unless <strong>identifiers</strong> is set* |
| **identifiers** | array | The unique identifiers of the desired videos. When set, this takes priority over **identifier**. | - |
| **include** | [Retrieve Video Params Array](#retrieve-video-params-array) | An array of properties to be included with the returned [Video Resources](#video-resource). | - |

### Retrieve Video Params Array

An array of properties to be included with a returned [Video Resource](#video-resource).

| Param | Description |
| ----- | ----------- |
| **signed_url** | Request a signed URL that can be used to view the video file directly. |
| **metadata** | Request metadata about the video. |
| **thumbnail** | Request signed URLs that can be used to view video thumbnails. |
| **jwts** | Request JWT tokens that can be used to view and/or edit a video on VidGrid. |
| **captions** | Request all of the [Caption Resources](#caption-resource) attached to this video. |
| **token_key** | Request the public identifier corresponding to the [Token Resource](#token-resources) used when creating this video through the API. |

## Update Video

This endpoint updates a video and then returns it as a [Video Resource](#video-resource).

### HTTP Request

> Example update video request.

```shell
curl -X PATCH \
  'https://api.vidgrid.com/v2/videos/identifier' \
  -H 'Authorization: Basic {token}' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "title": "Updated Video Title"
    }
  }'
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.vidgrid.com/v2/videos/identifier")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Patch.new(url)
request["Content-Type"] = 'application/json'
request["Authorization"] = 'Basic {token}'
request.body = '{
  "properties": {
    "title": "Updated Video Title"
  }
}'

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "https://api.vidgrid.com/v2/videos/identifier"

payload = '{
  "properties": {
    "title": "Updated Video Title"
  }
}'
headers = {
  'Content-Type': "application/json",
  'Authorization': "Basic {token}",
}

response = requests.request("PATCH", url, data=payload, headers=headers)

print(response.text)
```

```javascript
// NodeJS

var request = require("request");

var options = {
  method: 'PATCH',
  url: 'https://api.vidgrid.com/v2/videos/identifier',
  headers: { 
    Authorization: 'Basic {token}',
    'Content-Type': 'application/json' 
  },
  body: { 
    properties: {
      title: "Updated Video Title"
    }
  },
  json: true 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> Example update video response. See [Video Resource](#video-resource) for more details.

```json
{
  "data": Video Resource Object
}
```

`PATCH https://api.vidgrid.com/v2/videos`

### HTTP Parameters

| Param | Type | Description | Default |
| ----- | ---- | ----------- | ------- |
| **identifier** | string | The unique identifier of a video.<br>*You may pass this in the body or on the URL: `/v2/videos/identifier`* | *Required* |
| **properties** | [Update Video Props Object](#update-video-props-object) | An object used to update properties on a video. | *Required* |

### Update Video Props Object

An object used to update properties on a video.

| Param | Type | Description |
| ----- | ---- | ----------- |
| **title** | string | Updates the video title. |

## Delete Video

This endpoint deletes a video.

### HTTP Request

> Example delete video request.

```shell
curl -X DELETE \
  'https://api.vidgrid.com/v2/videos/identifier' \
  -H 'Authorization: Basic {token}' \
  -H 'Content-Type: application/json' \
  -d '{
    "trash": true
  }'
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://api.vidgrid.com/v2/videos/identifier")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Delete.new(url)
request["Content-Type"] = 'application/json'
request["Authorization"] = 'Basic {token}'
request.body = '{
  "trash": true
}'

response = http.request(request)
puts response.read_body
```

```python
import requests

url = "https://api.vidgrid.com/v2/videos/identifier"

payload = '{
  "trash": true
}'
headers = {
  'Content-Type': "application/json",
  'Authorization': "Basic {token}",
}

response = requests.request("DELETE", url, data=payload, headers=headers)

print(response.text)
```

```javascript
// NodeJS

var request = require("request");

var options = {
  method: 'DELETE',
  url: 'https://api.vidgrid.com/v2/videos/identifier',
  headers: { 
    Authorization: 'Basic {token}',
    'Content-Type': 'application/json' 
  },
  body: { 
    trash: true
  },
  json: true 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> The delete video endpoint returns a 204 No Content response when successful.

`DELETE https://api.vidgrid.com/v2/videos`

### HTTP Parameters

| Param | Type | Description | Default |
| ----- | ---- | ----------- | ------- |
| **identifier** | string | The unique identifier of a video.<br>*You may pass this in the body or on the URL: `/v2/videos/identifier`* | *Required* |
| **trash** | bool | If set to true, the video will be placed in the VidGrid trash for 30 days. If set to false, the trash will be skipped and the video will be deleted immediately. | true |