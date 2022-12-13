import React, { useState, useEffect } from "react";
import axios from "axios";

function Usuario(props) {
  const [usuario, setUsuario] = useState();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const getUsersById = (id) => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/:id",
        { headers: { Authorization: "rogerio-kayronny72-barbosa-b" } }
      )
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getUsersById(props.usuario.id);
  }, []);
  return (
    <>
      {editar ? (
        <div>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button>Enviar alterações</button>
        </div>
      ) : (
        <div>
          <p>Nome:{props.usuario.nome}</p>
          <p>E-mail:{props.usuario.email}</p>
        </div>
      )}
      .err
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button>Excluir</button>
    </>
  );
}

export default Usuario;
