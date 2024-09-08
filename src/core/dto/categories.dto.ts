import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class NewCategoryDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiPropertyOptional()
    description: string;
}


export class UpdateCategoryDto {
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    description: string;
}

export class DeleteCategoryDto {
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        isArray: true,
    })
    id: number[];
}