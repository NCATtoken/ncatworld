// this long function will map the tile variant to the repsective sprite
export function tileStitcher(variant: number): { r: number, c: number } {
    var r = 0, c = 0;
    switch (variant) {
        // filled
        case 0x7d:
        case 0x7c:
        case 0x78:
        case 0x3c:
        case 0x3d:
        case 0x39:
        case 0x38: r = 0; c = 0; break;
        case 0xbd:
        case 0xfc:
        case 0xfd:
        case 0xb8:
        case 0xbc:
        case 0xf9:
        case 0xed:
        case 0xe8:
        case 0xf8: r = 0; c = 1; break;
        case 0xe4:
        case 0xf5:
        case 0xf1:
        case 0xf0:
        case 0xe1:
        case 0xa5:
        case 0xe5:
        case 0xe0: r = 0; c = 2; break;
        case 0x7f:
        case 0x2e:
        case 0x3a:
        case 0x3f:
        case 0x2f:
        case 0x7a:
        case 0x7e:
        case 0x6f:
        case 0x6e:
        case 0x3e: r = 1; c = 0; break;
        case 0xbe:
        case 0xba:
        case 0xbf:
        case 0xaf:
        case 0xfe:
        case 0xab:
        case 0xeb:
        case 0xfa:
        case 0xfb:
        case 0xef:
        case 0xff: r = 1; c = 1; break;
        case 0xf6:
        case 0xf3:
        case 0xe7:
        case 0xa7:
        case 0xe2:
        case 0xf7:
        case 0xe6:
        case 0xe3: r = 1; c = 2; break;
        case 0x5f:
        case 0x1f:
        case 0x0f:
        case 0x1e:
        case 0x4e:
        case 0x4f:
        case 0x0e: r = 2; c = 0; break;
        case 0xce:
        case 0xcb:
        case 0x9f:
        case 0xdf:
        case 0xcf:
        case 0x8e:
        case 0x8f: r = 2; c = 1; break;
        case 0xd3:
        case 0x87:
        case 0xc3:
        case 0xd7:
        case 0xc7:
        case 0x83: r = 2; c = 2; break;

        // 田
        case 0x69:
        case 0x68:
        case 0x6c:
        case 0x2c:
        case 0x28: r = 0; c = 3; break;
        case 0xa9:
        case 0xe9:
        case 0xb9:
        case 0xec:
        case 0xac:
        case 0xad:
        case 0xa8: r = 0; c = 4; break;
        case 0xb4:
        case 0xb0:
        case 0xb1:
        case 0xa1:
        case 0xa4:
        case 0xa0: r = 0; c = 5; break;
        case 0x6a:
        case 0x6b:
        case 0x2a: r = 1; c = 3; break;
        case 0xea:
        case 0xa6:
        case 0xae:
        case 0x2b:
        case 0xaa: r = 1; c = 4; break;
        case 0xb7:
        case 0xf2:
        case 0xb2:
        case 0xb6:
        case 0xb3:
        case 0xa3:
        case 0xa2: r = 1; c = 5; break;
        case 0x1b:
        case 0x0b:
        case 0x4b:
        case 0x4a:
        case 0x1a:
        case 0x0a: r = 2; c = 3; break;
        case 0x8b:
        case 0xdb:
        case 0xca:
        case 0x9b:
        case 0x8a: r = 2; c = 4; break;
        case 0x92:
        case 0x96:
        case 0x86:
        case 0xc2:
        case 0xc6:
        case 0xd2:
        case 0x82: r = 2; c = 5; break;

        //  <
        case 0x4d:
        case 0x5d:
        case 0x5c:
        case 0x0d:
        case 0x09:
        case 0x19:
        case 0x49:
        case 0x1d:
        case 0x1c:
        case 0x0c:
        case 0x48:
        case 0x08:
        case 0x18:
        case 0x58:
            r = 0; c = 6; break;
        // case 0x00: r = 0; c = 7; break;
        // >
        case 0xd4:
        case 0xd5:
        case 0xc5:
        case 0xd0:
        case 0x90:
        case 0x91:
        case 0x94:
        case 0xd1:
        case 0xc1:
        case 0xc0:
        case 0x84:
        case 0x80:
        case 0x81:
        case 0x85:
            r = 0; c = 8; break;
        // case 0x00: r = 1; c = 6; break;
        // case 0x00: r = 1; c = 7; break;
        // case 0x00: r = 1; c = 8; break;

        // ^
        case 0x65:
        case 0x31:
        case 0x74:
        case 0x71:
        case 0x35:
        case 0x25:
        case 0x61:
        case 0x75:
        case 0x24:
        case 0x34:
        case 0x70:
        case 0x30:
        case 0x60:
        case 0x64:
        case 0x20: r = 0; c = 9; break;
        // case 0x00: r = 0; c = 10; break;
        // case 0x00: r = 1; c = 9; break;
        // case 0x00: r = 1; c = 10; break;

        // V
        case 0x56:
        case 0x13:
        case 0x47:
        case 0x17:
        case 0x53:
        case 0x52:
        case 0x46:
        case 0x16:
        case 0x57:
        case 0x42:
        case 0x43:
        case 0x06:
        case 0x03:
        case 0x07:
        case 0x12:
        case 0x02: r = 2; c = 9; break;
        // case 0x00: r = 2; c = 10; break;

        // -
        // case 0x00: r = 0; c = 12; break;
        case 0x9d:
        case 0x9c:
        case 0xcc:
        case 0x99:
        case 0xd9:
        case 0xcd:
        case 0xc9:
        case 0x89:
        case 0x8c:
        case 0x98:
        case 0x88:
        case 0xc8:
        case 0x8d:
        case 0xdd:
        case 0xdc:
        case 0xd8: r = 0; c = 13; break;
        // case 0x00: r = 0; c = 14; break;

        // |
        case 0x21:
        case 0x73:
        case 0x37:
        case 0x33:
        case 0x72:
        case 0x27:
        case 0x22:
        case 0x76:
        case 0x67:
        case 0x63:
        case 0x36:
        case 0x26:
        case 0x62:
        case 0x32:
        case 0x23:
        case 0x77:
        case 0x66:
        case 0x22: r = 1; c = 12; break;
        // case 0x00: r = 1; c = 13; break;
        // case 0x00: r = 1; c = 14; break;
        // case 0x00: r = 2; c = 12; break;
        // case 0x00: r = 2; c = 13; break;
        // case 0x00: r = 2; c = 14; break;


        default: r = 1; c = 13;
    }
    return { r, c };
}