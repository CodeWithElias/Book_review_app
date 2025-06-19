import { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromRequest } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'No autorizado' });

  if (req.method === 'DELETE') {
    const { id } = req.query;

    const review = await prisma.review.findUnique({
      where: { id: Number(id) },
    });

    if (!review || review.userId !== (user as any).userId)
      return res.status(403).json({ error: 'No autorizado para eliminar esta reseña' });

    await prisma.review.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Reseña eliminada' });
  } else {
    res.status(405).end();
  }
}