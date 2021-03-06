import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/models/user.model';

export const CurrentUser = createParamDecorator(async (data: { reload: boolean }, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  let user = request.user;
  if (data?.reload) user = await User.findByPk(user.id);
  return user;
});
