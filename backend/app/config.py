from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "FRIDAY Personal AI Intelligence System"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Server settings
    HOST: str = "127.0.0.1"
    PORT: int = 8000
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
    ]

    # Paths
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    KNOWLEDGE_DIR: Path = BASE_DIR / "knowledge"
    INDEX_FILE: Path = KNOWLEDGE_DIR / "index.json"

    model_config = SettingsConfigDict(
        env_prefix="FRIDAY_",
        case_sensitive=False,
    )


settings = Settings()
