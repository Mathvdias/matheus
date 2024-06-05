// pages/api/repos.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://api.github.com/users/Mathvdias/repos');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar repositórios.' });
  }
}
