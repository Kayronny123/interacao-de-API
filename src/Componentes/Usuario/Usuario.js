import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`;
function Usuario(props) {
  const [usuario, setUsuario] = useState({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  const getUsersById = (id) => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        { headers: { Authorization: "rogerio-kayronny72-barbosa-b" } }
      )
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsersById(props.usuario.id);
  }, []);
  const deleteUser = () => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        { headers: { Authorization: "rogerio-kayronny72-barbosa-b" } }
      )
      .then((res) => {
        console.log("deletou");
        props.setAtualiza(!props.atualiza);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const upDateUser = (id) => {
    const body = {
      name: nome,
      email: email
    };
    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        body,
        { headers: { Authorization: "rogerio-kayronny72-barbosa-b" } }
      )
      .then((res) => {
        alert("usuario editado");
        props.setAtualiza(!props.atualiza);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>Email:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button
            onClick={() => {
              upDateUser(props.usuario.id);
            }}
          >
            Enviar alterações
          </button>
        </div>
      ) : (
        <div>
          <p>Nome:{usuario.nome}</p>
          <p>E-mail:{usuario.email}</p>
        </div>
      )}
      .err
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={() => deleteUser(props.usuario.id)}>Excluir</button>
    </User>
  );
}

export default Usuario;
