function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => showChat())
      .catch(e => alert(e.message));
  }
  
  function signup() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => showChat())
      .catch(e => alert(e.message));
  }
  
  function showChat() {
    document.getElementById('login-box').classList.add('hidden');
    document.getElementById('chat-section').classList.remove('hidden');
  }
  
  function sendMessage() {
    const message = document.getElementById('chatInput').value;
    db.collection('messages').add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    document.getElementById('chatInput').value = '';
  }
  
  db.collection('messages').orderBy('createdAt')
    .onSnapshot(snapshot => {
      const feed = document.getElementById('feed');
      feed.innerHTML = '';
      snapshot.forEach(doc => {
        const msg = document.createElement('div');
        msg.textContent = doc.data().text;
        feed.appendChild(msg);
      });
    });
  