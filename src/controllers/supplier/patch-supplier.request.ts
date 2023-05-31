import { PartialType } from '@nestjs/mapped-types';
import { PostSupplierRequest } from './post-supplier.request';

export class PatchSupplierRequest extends PartialType(PostSupplierRequest) {}
