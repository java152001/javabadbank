function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

  const firebaseConfig = {
    apiKey: "AIzaSyCaWCxpOkw6LfwYUqCsTcwNqH5rFQIO_YM",
    authDomain: "badbankauth.firebaseapp.com",
    projectId: "badbankauth",
    storageBucket: "badbankauth.appspot.com",
    messagingSenderId: "990411176555",
    appId: "1:990411176555:web:721c45f070e698d6124f2e"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  function handle(){

    firebase.auth().currentUser.getIdToken()
    .then(idToken => {
      fetch(`/account/${email}`, {
        method: 'GET',
        headers: {
          'Authorization' : idToken
        }
      })
      .then(response => response.json())
      .then(data => {
        setBalance(data.balance);
        props.setStatus('Your balance is: ' + data.balance);      
        props.setShow(false);
      });
    })

    
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}