import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";
import "@typespec/openapi";

using TypeSpec.OpenAPI;

@service({
    title: "Quest Service",
  })
namespace Quest {
    @errorCodes(ErrorCode.ERROR_CODE_1 | ErrorCode.ERROR_CODE_3)
    op finishQuest(): finishQuestResponse;
}

@service({
    title: "Present Service",
  })
namespace Present {
    @errorCodes(ErrorCodePresentGroup)
    op receivePresent(): receivePresentResponse;
}

union ErrorCode {
    ERROR_CODE_1: "1: 内部エラー";
    ERROR_CODE_2: "2: リクエストが不正";
    ERROR_CODE_3: "3: 認証エラー";
}

union ErrorCodePresentGroup {
    ErrorCode.ERROR_CODE_1;
    ErrorCode.ERROR_CODE_2;
}

model finishQuestResponse {
    success: boolean;
    reward: Reward;
}


model receivePresentResponse {
    success: boolean;
    reward: Reward;
    receiveDate: utcDateTime;
}

model Reward {
    items: Item[];
    weapons: Weapon[];
}

model Item {
    /** ID */
    id: string;
    /** 名前 */
    name: string;
    /** 数量 */
    amount: int64;
}

model Weapon {
    /** ID */
    id: string;
    /** 名前 */
    name: string;
    /** 数量 */
    strength: int64;
}

