import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NewProductDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional({
        type: Number
    })
    idCategory: number;

    @ApiPropertyOptional({
        type: Number
    })
    price: number;
}


export class UpdateProductDto {
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    description: string;

    @ApiPropertyOptional({
        type: Number
    })
    price: number;

    @ApiPropertyOptional({
        type: Number
    })
    idCategory: number;
}

export class DeleteProductDto {
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        isArray: true,
    })
    id: number[];
}