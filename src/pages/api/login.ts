import bcrypt from "bcryptjs";
import { generateToken } from "../../../lib/jwt";
import { prisma } from "../../../lib/prisma";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Correo o contraseña inválidos' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Correo o contraseña inválidos' });

  const token = generateToken({ userId: user.id });

  res.setHeader('Set-Cookie', serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  }));

  res.status(200).json({ message: 'Inicio de sesión exitoso', name: user.name });
}