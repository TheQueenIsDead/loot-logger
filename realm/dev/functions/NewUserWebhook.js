

exports = async function(event) {
  

  const webhook = context.values.get("webhook-dev");
  
  const message = `Welcome to LootLogger ${event.user.data.email}! User ${event.user.id} signed up via ${event.providers}`;

  const response = await context.http.post({
    url: webhook,
    body: { 
      content: message,
      username: "Mongo",
      avatar_url: "https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem-500x313.jpg"
    },
    encodeBodyAsJSON: true
  })
  // The response body is a BSON.Binary object. Parse it and return.
  return EJSON.parse(response.body.text());
};