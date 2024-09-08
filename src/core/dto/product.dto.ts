import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NewProductDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiPropertyOptional()
    description: string;

    @IsNotEmpty()
    @ApiPropertyOptional({
        type: Number
    })
    idCategory: number;
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