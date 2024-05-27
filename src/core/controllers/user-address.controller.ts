import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
  CreateUserAddressDto,
  UpdateUserAddressDto,
} from "../dto/user-address.dto";
import { UserAddressService } from "../services/user-address.service";
import { QueryParamsDto } from "../../admin/dto/query-params.dto";
import { CurrentUser } from "../../shared/decorator/current-user.decorator";

@Controller("user-address")
@ApiTags("User Address")
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}
  @Post()
  addUserAddress(
    @CurrentUser("id") user_id: string,
    @Body() createUserAddressDto: CreateUserAddressDto,
  ) {
    return this.userAddressService.create(user_id, createUserAddressDto);
  }

  @Get()
  getAllUserAddressByUserId(
    @CurrentUser("id") user_id: string,
    @Query() queryParamsDto: QueryParamsDto,
  ) {
    return this.userAddressService.findAll(user_id, queryParamsDto);
  }

  @Get(":id")
  getUserAddressById(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.userAddressService.findOne(user_id, id);
  }

  @Patch(":id")
  updateUserAddress(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ) {
    return this.userAddressService.update(user_id, id, updateUserAddressDto);
  }

  @Delete(":id")
  deleteUserAddressById(
    @CurrentUser("id") user_id: string,
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
  ) {
    return this.userAddressService.delete(user_id, id);
  }
}
