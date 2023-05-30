import { ApiProperty } from '@nestjs/swagger';
import { Contact } from 'src/schemas/Contact.schema';

export class ContactModel {
  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  address: string;

  static fromEntity(contact: Contact) {
    if (!contact) return null;

    const model = new ContactModel();

    model.address = contact.address;
    model.phone_number = contact.phone_number;

    return model;
  }
}
