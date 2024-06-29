class Ai {
  constructor() {
    this.getUid();
    this.getSeshId();
  }

  getUid() {
    this.uid = Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  async getSeshId() {
    const res = await fetch("https://boredhumans.com/apis/boredagi_api.php", {
      method: "POST",
      body: new URLSearchParams({
        prompt: encodeURIComponent("I want to talk to someone famous."),
        uid: this.uid,
        sesh_id: "None",
        get_tool: false,
        tool_num: 10,
      }),
    }).then((v) => v.json());
    if (res.status !== "success") return (this.sesh_id = "none");
    return (this.sesh_id = res.sesh_id);
  }

  async celebrityAi(prompt) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.sesh_id) await this.getSeshId();
        const data = new URLSearchParams({
          prompt: encodeURIComponent(prompt),
          uid: this.uid,
          sesh_id: this.sesh_id,
          get_tool: false,
          tool_num: 10,
        });

        const res = await fetch(
          "https://boredhumans.com/apis/boredagi_api.php",
          {
            method: "POST",
            body: data,
          }
        ).then((v) => v.json());
        if (res.status !== "success")
          return (async () => {
            await this.getUid();
            await this.getSeshId();
            await this.celebrityAi(prompt);
          })();
        return resolve(res.output);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export { Ai };
