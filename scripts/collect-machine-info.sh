#!/usr/bin/env bash
set -euo pipefail

source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/lib.sh"

ensure_dirs

product_name="$(sw_vers -productName)"
product_version="$(sw_vers -productVersion)"
build_version="$(sw_vers -buildVersion)"
kernel="$(uname -a)"
chip="$(sysctl -n machdep.cpu.brand_string)"
model="$(sysctl -n hw.model)"
memory_bytes="$(sysctl -n hw.memsize)"
memory_gb="$(awk -v bytes="$memory_bytes" 'BEGIN { printf "%.0f", bytes / 1024 / 1024 / 1024 }')"
physical_cpu="$(sysctl -n hw.physicalcpu)"
logical_cpu="$(sysctl -n hw.logicalcpu)"
core_description="$(system_profiler SPHardwareDataType 2>/dev/null | awk -F': ' '/Total Number of Cores/ {print $2; exit}')"

cat > "$ROOT/results/machine.json" <<JSON
{
  "machine": "MacBook Air",
  "model": "$model",
  "chip": "$chip",
  "core_description": "$core_description",
  "physical_cpu": $physical_cpu,
  "logical_cpu": $logical_cpu,
  "memory_bytes": $memory_bytes,
  "memory_gb": $memory_gb,
  "os": "$product_name $product_version",
  "build": "$build_version",
  "kernel": "$kernel",
  "notes": "Serial number, hardware UUID, provisioning UDID, and other unique identifiers are intentionally excluded."
}
JSON

cat "$ROOT/results/machine.json"
