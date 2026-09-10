// 故意违规：var、==、缺分号，供 `pnpm scan` / `pnpm fix` 验证
export function playground() {
  const count = 1;
  if (count == '1') {
    console.log(count);
  }
  return count;
}
