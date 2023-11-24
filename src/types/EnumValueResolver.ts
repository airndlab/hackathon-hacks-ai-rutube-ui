import EnumValueDescription from "@/types/EnumValueDescription";

export default interface EnumValueResolver {
  [enumKey: string]: EnumValueDescription;
}
