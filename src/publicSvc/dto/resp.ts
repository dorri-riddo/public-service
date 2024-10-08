import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ResPublicSvcResult {
  @Field({ description: '요청결과 - 코드' })
  CODE: string;

  @Field({ description: '요청결과 - 메시지' })
  MESSAGE: string;
}

@ObjectType()
class ResTvYeyakCOllect {
  @Field({ description: '총 데이터 건수' })
  list_total_count: number;

  @Field(() => ResPublicSvcResult, { description: '요청결과' })
  RESULT: ResPublicSvcResult;

  @Field(() => [ResPublicSvcRow], { description: '공공 서비스 데이터 목록' })
  row: ResPublicSvcRow[];
}

@ObjectType()
export class ResPublicSvcs {
  @Field(() => ResTvYeyakCOllect, { description: '공공서비스 종합 정보' })
  tvYeyakCOllect: ResTvYeyakCOllect;
}

@ObjectType()
class ResPublicSvcRow {
  @Field()
  DIV: string;

  @Field()
  SERVICE: string;

  @Field()
  GUBUN: string;

  @Field()
  SVCID: string;

  @Field()
  MAXCLASSNM: string;

  @Field()
  MINCLASSNM: string;

  @Field()
  SVCSTATNM: string;

  @Field()
  SVCNM: string;

  @Field()
  PAYATNM: string;

  @Field()
  PLACENM: string;

  @Field()
  USETGTINFO: string;

  @Field()
  SVCURL: string;

  @Field()
  X: string;

  @Field()
  Y: string;

  @Field()
  SVCOPNBGNDT: string;

  @Field()
  SVCOPNENDDT: string;

  @Field()
  RCPTBGNDT: string;

  @Field()
  RCPTENDDT: string;

  @Field()
  AREANM: string;

  @Field()
  IMGURL: string;

  @Field()
  DTLCONT: string;

  @Field()
  TELNO: string;

  @Field()
  V_MAX: string;

  @Field()
  V_MIN: string;

  @Field()
  REVSTDDAY: number;

  @Field()
  REVSTDDAYNM: string;
}

@ObjectType()
class ResListPublicReservationDetail {
  @Field({ description: '총 데이터 건수' })
  list_total_count: number;

  @Field(() => ResPublicSvcResult, { description: '요청결과' })
  RESULT: ResPublicSvcResult;

  @Field(() => [ResPublicSvcDetailRow], {
    description: '공공서비스 상세 정보 ',
  })
  row: ResPublicSvcDetailRow[];
}

@ObjectType()
export class ResPublicSvcDetail {
  @Field(() => ResListPublicReservationDetail, {
    description: '공공서비스 상세 정보',
  })
  ListPublicReservationDetail: ResListPublicReservationDetail;
}

@ObjectType()
class ResPublicSvcDetailRow {
  @Field()
  SVCID: string;

  @Field()
  SVCNM: string;

  @Field()
  FEEGUIDURL: string;

  @Field()
  SVCBEGINDT: string;

  @Field()
  SVCENDDT: string;

  @Field()
  PLACESN: string;

  @Field()
  PLACENM: string;

  @Field()
  SUBPLACENM: string;

  @Field()
  PAYAT: string;

  @Field()
  RCPTMTHD: string;

  @Field()
  RCEPTMTH_NM: string;

  @Field()
  RCEPTBEGDT: string;

  @Field()
  RCEPTENDDT: string;

  @Field()
  RCRPERCAP: string;

  @Field()
  UNITCODE: string;

  @Field()
  UNICODE_NM: string;

  @Field()
  SELMTHDCODE: string;

  @Field()
  SELMTHDCODE_NM: string;

  @Field()
  SVCENDTELNO: string;

  @Field()
  SVCENDUSRSN: string;

  @Field()
  ORGNM: string;

  @Field()
  ONEREQMINPR: number;

  @Field()
  ONEREQMXMPR: number;

  @Field()
  SVCSTTUS: string;

  @Field()
  SVCSTTUS_NM: string;

  @Field()
  REVSTDDAY: string;

  @Field()
  CODE: string;

  @Field()
  CODENM: string;

  @Field()
  SMCODE: string;

  @Field()
  SMCODE_NM: string;

  @Field()
  WAITNUM: number;

  @Field()
  USETIMEUNITCODE: string;

  @Field()
  USETIMEUNITCODE_NM: string;

  @Field()
  USEDAYSTDRCPTDAY: string;

  @Field()
  USEDAYSTDRCPTTIME: string;

  @Field()
  RSVDAYSTDRCPTDAY: string;

  @Field()
  RSVDAYSTDRCPTTIME: string;

  @Field()
  USELIMMINNOP: number;

  @Field()
  USELIMMAXNOP: number;

  @Field()
  EXTINFO: string;

  @Field()
  X: string;

  @Field()
  Y: string;

  @Field()
  ADRES: string;

  @Field()
  TELNO: string;

  @Field()
  SVCOPNBGNDT: string;

  @Field()
  SVCOPNENDDT: string;

  @Field()
  RCPTBGNDT: string;

  @Field()
  RCPTENDDT: string;

  @Field()
  AREANM: string;

  @Field()
  NOTICE: string;

  @Field()
  IMG_PATH: string;

  @Field()
  DTLCONT: string;

  @Field()
  V_MAX: string;

  @Field()
  V_MIN: string;

  @Field()
  REVSTDDAYNM: string;
}
