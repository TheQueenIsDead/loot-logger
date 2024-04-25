

exports = async function() {
  
  const user = context.user
  
  const response = await context.http.post({
    url: "https://discord.com/api/webhooks/1232869123042705418/IwFMoOOIHDafv4sCjl_Tc8jRbQOcRxwBuIltjtm-UtQLIa_SKyaVI54TNX0rv2yPa9I_",
    body: { 
      content: JSON.stringify(user),
      username: "Mongo",
      avatar_url: "https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem-500x313.jpg"
    },
    encodeBodyAsJSON: true
  })
  // The response body is a BSON.Binary object. Parse it and return.
  return EJSON.parse(response.body.text());
};