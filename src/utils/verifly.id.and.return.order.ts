import { NotFoundException } from '@nestjs/common';

// const veriflyIdAndReturnOrder = (id: number) => {
//   const module = await this.prisma.order.findUnique({ where: { id } });

//   if (!module) {
//     throw new NotFoundException(`id ${id} not found`);
//   }

//   return module;
// };

export const veriflyIdAndReturnElement = async (id: number, module: any) => {
  const element = await module;

  if (!element) {
    throw new NotFoundException(`id ${id} not found`);
  }

  return element;
};

//coloquei apenas no order service
