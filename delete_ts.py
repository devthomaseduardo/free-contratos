import os

files_to_delete = [
    "backend/src/app.ts",
    "backend/src/config.ts",
    "backend/src/index.ts",
    "backend/src/openapi.ts",
    "backend/src/middleware/errorHandler.ts",
    "backend/src/routes/ai.ts",
    "backend/src/services/geminiService.ts",
    "backend/tsconfig.json",
    "frontend/src/App.tsx",
    "frontend/src/main.tsx",
    "frontend/src/types.ts",
    "frontend/src/vite-env.d.ts",
    "frontend/src/services/api.ts",
    "frontend/src/components/Sidebar.tsx",
    "frontend/src/components/ContractForm.tsx",
    "frontend/src/components/ContractPreview.tsx",
    "frontend/src/components/ui/Input.tsx",
    "frontend/tsconfig.json",
    "frontend/tsconfig.node.json",
    "frontend/vite.config.ts"
]

base_path = "/home/thomas/Documentos/Github/free-contratos"

for f in files_to_delete:
    full_path = os.path.join(base_path, f)
    if os.path.exists(full_path):
        try:
            os.remove(full_path)
            print(f"Deleted {f}")
        except Exception as e:
            print(f"Error deleting {f}: {e}")
    else:
        print(f"File not found: {f}")
